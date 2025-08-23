## 📂 Framework Structure

- **tests/** → All test specs go here.  
- **assertions/** → Custom assertion functions (to extend `expect`).  
- **utils/** → Common reusable utilities (e.g., date formatters, file readers).  
- **pages/** → Page Object Models (e.g., `loginPage.ts`, `homePage.ts`).  
- **constants/** → Store reusable constants like environment URLs, error messages.  
- **setup/** → Pre and post setup (global setup/teardown scripts).  
- **resources/** → Test data, screenshots, JSON/YAML files, etc.  
- **loggers/** → Centralized logging (e.g., Winston, Pino, or custom logger).  
- **exceptions/** → Custom exception classes (e.g., `ElementNotFoundError`).  
- **helpers/** → Small utility methods used in a few classes (not generic enough for utils).  
- **environment/** → Environment config files (`test-local.ts`, `staging.ts`, `prod.ts`).  
- **configuration/** → Supportive config files (URLs, endpoints, API configs).  
