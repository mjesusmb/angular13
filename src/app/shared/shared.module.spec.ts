import { AppSharedModule } from './shared.module';

describe('SharedModule', () => {
    let sharedModule: AppSharedModule;

    beforeEach(() => {
        sharedModule = new AppSharedModule();
    });

    it('should create an instance', () => {
        expect(sharedModule).toBeTruthy();
    });
});
