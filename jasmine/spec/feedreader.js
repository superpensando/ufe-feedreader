/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined(); //allFeed variable defined
            expect(allFeeds.length).not.toBe(0); //allFeed variable is not empty
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL are defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined(); //url property is defined
                expect(feed.url.length).not.toBe(0); //url property is not empty
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name are defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined(); //name property is defined
                expect(feed.name.length).not.toBe(0); //name property is not empty
            });
        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        const body = $("body");
        const menuIcon = $('.menu-icon-link'); 

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('The menu is hidden by default', function() {
            //By default
            //The (.menu-hidden) class in the (body) --> Hides the menu
            expect(body.hasClass("menu-hidden")).toBe(true); 
        });

        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
        */
        it('When the menu icon is clicked, the menu changes it visibility', function() {
            //The (.menu-hidden) class in the (body), hides the menu
            menuIcon.click(); //Click menu Icon
            //The (.menu-hidden) class aren't in the (body)-> Shows the menu        
            expect(body.hasClass("menu-hidden")).toBe(false);

            menuIcon.click();//Click menu Icon
            //The (.menu-hidden) class are in the (body)-> Hides the menu  
            expect(body.hasClass("menu-hidden")).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
        */

        beforeEach((done) => {
            //Call the loadFeed function for a id=0 --> Adds .entry elements in .feed container
           loadFeed(0, function(){
                done();
            });
        });
        
        it('There is at least a single `.entry` element in the `.feed` container', function(done) {
            //The total number of .entry elements > 0
            expect($(".feed .entry").length).toBeGreaterThan(0);
            done();
        }); 
        

    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        const feed = $('.feed');
        let feed0;
        let feed1; 

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        beforeEach((done) => {
            //Call the loadFeed function for a id=0 --> Adds .entry elements in .feed container
            loadFeed(0, function(){
                feed0 = feed.html();
                //Call the loadFeed function for a id=1 --> Adds .entry elements in .feed container
                loadFeed(1,function(){
                    feed1=feed.html();
                    done();
                });               
             });
         });
         
         it('When new feed is loaded, the content changes', function(done) {
             //The .entry elements(id=0) are not the same that the .entry elements for (id=1)
             //The content changes -> A new feed is loaded
             expect(feed0).not.toBe(feed1);
             done();
         });

    });

}());
