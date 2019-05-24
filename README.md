# S4RB Technical Interview

## What we're looking for

- A working solution
- Simplicity
- Test coverage
- A reasonable structure to your solution
- Clear direction on how to make modifications to your solution

## Your submission

- Pushed to a Github repository
- Shared with your technical contact at S4RB

**If you're invited for a chat with S4RB we'll aim to talk about your submission. Be ready for questions on your solution!**

# The task

## Brief

You have been tasked to create a reporting application that will allow an Account Manager to view complaints data via an online portal.

The company has provided you with a CSV file with all the complaints that the business has received and the number of corresponding sales in the given period.

Your solution will be incorporated into the existing reporting product if it adds the value we believes it will. Keep this in mind.

## Guidelines

### 1. Serve up the [complaints](/data/complaints.csv) data from an API endpoint

- Use Express, Hapi, vanilla HTTP, or any other server-side web framework
- Requests should be handled to respond with a CSV file
- Requests should be handled to respond with a JSON file

You will be extending on this to create the online portal!

### 2. Extend your endpoint to include the Complaints per million units (CPMU) based on the [complaints](/data/complaints.csv) data

- The file [cpmu.xlsx](/cpmu.xlsx) has been provided by the Account Manager as an example of the expected CPMU calculations
- CPMU should be displayed to 5 decimal places

An example breakdown of the CPMU per month:

|Month       | CPMU|
|---------- | ----------|
|January 2012|	5.47|
|February 2012|	57.66|
|March 2012|	12.13|
|May 2012|	67.78|
|June 2012|	93.68|
|July 2012|	57.30|

### 3. Update the endpoint to fill-in missing data when not available in the [complaints](/data/complaints.csv) data

- These values should be displayed as "No Value"

For example:

|Month       | CPMU|
|---------- | ----------|
|January 2012|	5.47|
|February 2012|	57.66|
|March 2012|	12.13|
|April 2012|	No Value |
|May 2012|	67.78|
|June 2012|	93.68|

### 4. Develop a basic reporting portal to display the CPMU breakdowns

- Angular, Angular.JS, React, Vue.js, or other
- Authentication is not required

![Example Reporting Portal](/example-2.png "Example Reporting Portal")

### 5. Allow the users of the portal to toggle between Quarter and Month aggregation for the CPMU breakdowns

- The user can view CPMU breakdowns by Quarter
- The user can view the CPMU breakdowns by Month
s
For example:

| Year |Quarter       | CPMU|
|---------- |---------- | ----------|
| 2012 |1|	7.19|
| 2012 |2|	82.69|
