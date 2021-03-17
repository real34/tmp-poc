import "./App.css";
import CommandPalette from "react-command-palette";

import Home from "./Home";
import Product from "./Product";
import { useState } from "react";
import SampleHeader from "./SampleHeader";

const MAGENTO_ADMIN = "https://magento2.demoservices.front-commerce.com/admin";
const goToMagentoAdmin = (url) => goTo(MAGENTO_ADMIN + url);
const goTo = (url) => {
  const preloadLink = document.createElement("link");
  preloadLink.href = url;
  preloadLink.rel = "preload";
  document.head.appendChild(preloadLink);

  return () => {
    document.location.href = url;
  };
};

const presets = {
  MagentoGeneric: [
    {
      name: "Go to Product list",
      command: goToMagentoAdmin("/catalog/product/index"),
    },
    { name: "Go to Category list" },
    { name: "Go to Customer list" },
    { name: "Go to Order list" },
    { name: "Go to CMS Page list" },
    { name: "Go to CMS Block list" },
    {
      name: "Go to Configuration",
      command: goToMagentoAdmin("/system_config/index"),
    },
    { name: "Edit Category … → interactive, then asks SKU" },
    { name: "Edit Product … → interactive, then asks SKU" },
    { name: "Edit Page … → interactive, then asks SKU" },
    { name: "Edit CMS Block … → interactive, then asks SKU" },
    { name: "View Order … → interactive" },
    { name: "Log as Customer … → interactive email" },
  ].map((item) => ({
    command: goToMagentoAdmin("/"),
    ...item,
  })),
  MagentoHP: [
    { name: "Edit Page Home (current)" },
    { name: "Edit Category A40 (secondary)" },
    { name: "Edit Product B42 (secondary)" },
    { name: "Edit CMS Block C150 (secondary)" },
    { name: "Edit CMS Block footer" },
  ].map((item) => ({
    command: goToMagentoAdmin("/"),
    ...item,
  })),
  MagentoProduct: [
    { name: "Edit Product B42 (current)" },
    { name: "Edit CMS Block footer" },
  ].map((item) => ({
    command: goToMagentoAdmin("/"),
    ...item,
  })),
  "Google Analytics": [
    {
      name: "Go to Google Analytics dashboard",
      command: goTo(
        "https://analytics.google.com/analytics/web/#/report-home/a154725716w218303390p208204603"
      ),
    },
    {
      name: "Go to Google Analytics stats for Title of the page (current)",
      command: goTo(
        "https://analytics.google.com/analytics/web/#/report/content-pages/a154725716w218303390p208204603/explorer-table.plotKeys=%5B%5D&_r.drilldown=analytics.pagePath:~2Fblog~2F2021~2F03~2F11~2Ffront-commerce-2.5~2F"
      ),
    },
  ],

  // "Front-Commerce":[
  //   "Switch store"

  // ]

  // Clean cache … → interactive name, pattern

  // Copy page information (title, url, content displayed)

  // Copy bug report information (url, time, IP, browser, console errors?, data?)
};

const pages = [
  {
    name: "Home",
    component: Home,
    commands: [...presets.MagentoHP, ...presets.MagentoGeneric],
  },
  {
    name: "Product",
    component: Product,
    commands: [...presets.MagentoProduct, ...presets.MagentoGeneric],
  },
];

const roles = ["Standard", "Marketing"];

function App() {
  const [isDisplayed, setDisplayed] = useState(false);
  const [page, setPage] = useState(pages[0]);
  const [role, setRole] = useState(roles[0]);
  const commands = [
    ...page.commands,
    ...(role === "Marketing" ? presets["Google Analytics"] : []),
  ];

  /**
   * ToDo:
   *  [] make it work with shortcuts
   *  [] add categories
   */
  return (
    <div className="App">
      <header className="App-header">
        {isDisplayed ? (
          <CommandPalette
            commands={commands}
            display="inline"
            header={<SampleHeader onClose={() => setDisplayed(false)} />}
            hotKeys={["/", "ctrl+k", "g a"]}
            placeholder="Try typing 'Edit', 'current' or 'Analytics'"
          />
        ) : (
          <button
            className="App-palette"
            onClick={() => setDisplayed(true)}
            title="ctrl+k or g then a"
          >
            Open the admin palette ⚙️
          </button>
        )}

        <nav>
          {pages.map((page, i) => (
            <button key={i} onClick={() => setPage(page)}>
              {page.name}
            </button>
          ))}
        </nav>

        <page.component />
      </header>
      <footer>
        Current role: {role} - Roles:{" "}
        {roles.map((role, i) => (
          <button key={i} onClick={() => setRole(role)}>
            {role}
          </button>
        ))}
      </footer>
    </div>
  );
}

export default App;
