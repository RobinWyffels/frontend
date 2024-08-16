import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
    env: {
      auth0_domain: "dev-k2d82dpnk36wm4mx.eu.auth0.com",
      auth0_client_id: "utJCPRkAxSzynRkvTotAosG6z4wQ8CvD",
      auth0_username: "robin.wyffels@student.hogent.be",
      auth0_password: "Test123456789"
    }
  },
});