Upgrade plan: Java 17 -> Java 21

Context

- Project: backend/
- Current Spring Boot parent: 3.5.3
- Current java.version property: 21 (updated in pom.xml)

Goal

- Upgrade runtime target to Java 21 and ensure the project builds and tests pass on JDK 21.

Constraints

- Automated 'generate_upgrade_plan_for_java_project' tool requires a paid plan and is unavailable. We'll proceed with a manual plan that mirrors what the tool would do.

Assumptions

- You will run commands on a machine with JDK 21 installed or allow the setup step to install one.
- Maven is available (mvn or mvnw will be used). The repository includes the Maven wrapper (mvnw).

Steps

1. Ensure JDK 21 is installed and active for the build.

   - Check: java -version
   - If missing: install JDK 21 (Adoptium/Eclipse Temurin or vendor of choice).

2. Build and run tests locally using the Maven wrapper:

   - On Windows PowerShell:
     .\\mvnw.cmd -v; .\\mvnw.cmd -U -DskipTests=false clean test

3. If compilation or test failures occur, iterate up to 3 times to fix:

   - Common fixes:
     - Update third-party dependency versions incompatible with Java 21.
     - Replace removed/encapsulated APIs, e.g., reflection on JDK internals.
     - Update plugin versions in `pom.xml` (maven-compiler-plugin, surefire, etc.).
     - Add explicit module exports or opens if using JPMS (unlikely for Spring Boot projects).

4. Optional: run OpenRewrite recipes or code mods (requires additional tooling).

5. Once green, commit changes and open a PR with the summary, CI notes, and a copy of this plan.

Files changed so far

- pom.xml: set <java.version>21 and added maven-compiler-plugin (release 21)

Next actions for me

- (Optional) Attempt automated upgrades if you enable the upgraded Copilot plan.
- Help you iterate on build/test failures after you run the local build.

If you'd like, I can try to install JDK 21 into the workspace environment and run the maven build here. Otherwise, run the commands above and paste any errors and I'll fix them.
