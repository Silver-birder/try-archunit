import "tsarch/dist/jest"
import {filesOfProject, slicesOfProject,} from "tsarch"
import * as path from "path";

describe("architecture", () => {
    it("Check dependency", async () => {
        const architectureUml = path.resolve(__dirname, "clean_architecture.puml");
        const violations = await slicesOfProject()
            .definedBy("src/(**)/")
            .should()
            .adhereToDiagramInFile(architectureUml)
            .check();
        await expect(violations).toEqual([])
    });
    it("Check 4_frameworks_and_drivers file name.", async () => {
        const violations = await filesOfProject()
            .inFolder("4_frameworks_and_drivers/web")
            .should()
            .matchPattern(".*Web\.ts")
            .check();

        await expect(violations).toEqual([])
    });
    it("Check 3_interface_adapters file name.", async () => {
        const violations1 = await filesOfProject()
            .inFolder("3_interface_adapters/controllers")
            .should()
            .matchPattern(".*Controller\.ts")
            .check();
        const violations2 = await filesOfProject()
            .inFolder("3_interface_adapters/gateways")
            .should()
            .matchPattern(".*Gateway\.ts")
            .check();
        const violations3 = await filesOfProject()
            .inFolder("3_interface_adapters/presenters")
            .should()
            .matchPattern(".*Presenter\.ts")
            .check();
        const violations = violations1.concat(violations2, violations3);

        await expect(violations).toEqual([])
    });
    it("Check 2_application_business_rules file name.", async () => {
        const violations = await filesOfProject()
            .inFolder("2_application_business_rules/use_cases")
            .should()
            .matchPattern(".*UseCase\.ts")
            .check();

        await expect(violations).toEqual([])
    });
    it("Check 1_enterprise_business_rules file name.", async () => {
        const violations = await filesOfProject()
            .inFolder("1_enterprise_business_rules/entities")
            .should()
            .matchPattern(".*Entity\.ts")
            .check();

        await expect(violations).toEqual([])
    })
});
