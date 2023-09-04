# Tech-Alegria

## Routes 

## Components
* Navbar
* Landing
* Login/Signup
* Problem Statement
* Leaderboards
* Footer

## Data


## Flow
### Navbar
* Simple Transparent Navbar showing Tech Alegria and GDSC Logo

### Landing
* Full Width Landing Page needs to be done as per Design

### Signup
* Entry Level Component
* Reactive Form
* Client sends auth request for account creation
* Server responds with success auth 
* Redirect to Landing Page

### Login 
* Reactive Form 
* Client send request with credentials to check authentication
* Server responds with auth success
* Redirect to Landing Page

### Problem Statement
* Timer till 2hr
* Until timer is less show Problem Statement List
* List will redirect to hackerrank respective link
* Modal will appear for custom testcase and output along with status
* Client will cross-check the answer
    * IF matches THEN change status of current list to pass and unlock next list
    * ELSE change status of current list to failed 
* Client will send POST request to update the status of participant
* Server will respond with success status code

### Leaderboard
* Client will send request asking for all participants details
* Server will respond with Json data
* Client will feed the data to Table and show in descending order of score

### Footer
* Simple Transparent Footer showing Collab text with year

## Github Rules
* Make a new Branch for new feature
* Make a Pull Reuqest and Approve from Nishant and Sumant before merging
* Frequently take a parent branch pull
* Test the feature from your side locally before merging
* Merge into Main branch will be only done by Nishant or Sumant

## Team
* Bedant
* Sumant
* Nishant
* Atharva