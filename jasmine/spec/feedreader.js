/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable has been
           defined and that it is not empty.
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds object and
           ensures it has a URL defined and that the URL is not empty.
        */
        it('have URLs defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeTruthy();
            });
        });

        /* This test loops through each feed in the allFeeds object and ensures
           it has a name defined and that the name is not empty.
        */
        it('have names defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeTruthy();
            });
        });
    });


    // Test suite for side menu
    describe('The menu', function() {
        // Test that ensures the menu element is hidden by default.
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* Test that ensures the menu changes visibility when the menu
           icon is clicked and hidden when clicked again.
        */
        it('changes visibility on click', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });
    // Test suite for initial entries
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed function is called and
           completes its work, there is at least a single .entry element
           within the .feed container.
        */
        // Load feed before testing
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('have at least one entry', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    // Test suite for initial entries
    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded by the loadFeed
           function that the content actually changes.
        */
        // Store initial feed
        var existingFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                existingFeed = $('.feed').html();
                done();
            });
        });

        // Reset to initial feed after test
        afterEach(function() {
            loadFeed(0);
        });

        // Check new feed to ensure different content is available
        it('has new content', function(done) {
            loadFeed(1, function() {
                expect($('.feed').html()).not.toEqual(existingFeed);
                done();
            });
        });
    });
}());
