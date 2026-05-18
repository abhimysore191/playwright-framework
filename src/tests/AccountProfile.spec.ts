import { test } from '../fixtures/pages';
import { log } from '../utils/logger';
import { INVALID_PROFILE, NEW_PASSWORD, PROFILE } from '../utils/testData';

test.describe('Account Profile Tests', () => {
    test.beforeEach(async ({ loginPage, registeredUser, profilePage }) => {
        await loginPage.navigate();
        await loginPage.login(registeredUser.email, registeredUser.password);
        await profilePage.navigate();
        await profilePage.verifyConnectedUser(
            `${registeredUser.first_name} ${registeredUser.last_name}`
        );
        await profilePage.verifyUserEmail(registeredUser.email);
    });

    test('Verify that the user can view their account profile information', async ({
        profilePage
    }) => {
        await profilePage.updateProfileDetails(PROFILE);
        await profilePage.verifyAlertMessages([
            'Your profile is successfully updated!'
        ]);
    });

    test('Verify validation messages', async ({ profilePage }) => {
        await profilePage.updateProfileDetails(INVALID_PROFILE);
        await profilePage.verifyAlertMessages([
            'The first name field is required.',
            'The last name field is required.'
        ]);
    });

    test('Verify password update functionality', async ({
        profilePage,
        registeredUser,
        loginPage
    }) => {
        await profilePage.changePassword(registeredUser.password, NEW_PASSWORD);
        await profilePage.verifyAlertMessages([
            'Your password is successfully updated!'
        ]);
        await loginPage.login(registeredUser.email, NEW_PASSWORD);
    });
});
