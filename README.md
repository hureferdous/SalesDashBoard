# SalesDashBoard (Created by Flask, Mongodb, D3 Data Visualisation)
## Introduction
The goal of this project is to introduce the building blocks for creating a meaningful interactive __data visualization__. In this project dataset are used from the local Salesdashbord database which is stored in __MongoDB__. To create the dashboard covering a wide range of technologies: __MongoDB__ for storing and querying the data, __Python__ for building a web server that interacts with MongoDB and serving html pages, Javascript libraries __d3.js, dc.js and crossfilter.js__ for building interactive charts.

## Notes
* In this project all charts are interrelated to each other. Any filter applied in any chart will affect the remainder charts. So unless you wanted to apply several filters together, it’s better to reset filter after each query.

## Data
The Data are comes from a CSV file- are imported to a non relational database __MongoDB__ and converted into __JSON__ format. For this project I create data in MongoDB and save thoes data in salesdashboard.csv file.

## Structure
The project is mainly consist of three parts which are data, vendors libraries and CSS files:
* __temlpates:__ index.html where data and graphs are showed.
* __graph.js:__ In here all data and charts are handled.
* __SalesDeshboard.py:__ where routes and data connection are managed.

![pic19](https://user-images.githubusercontent.com/24476948/39973333-76d6bcbc-5716-11e8-9fbd-a0079f999b2c.PNG)


## Building the server
Here I use __Python Flask__ for building a server that interact with __MongoDB__ and render the html page that contains our charts. __Flask__ is one of the most popular web frameworks for __Python__. By creating a folder called SalesDashBoard. Inside the SalesDashBoard folder, I create a folder called templates, and inside the templates folder I create html file called __index.html__ and __main.html__.
In SalesDashBoard folder I create SalesDashboard.py where all the server code is included for this project.


![pic21](https://user-images.githubusercontent.com/24476948/40204800-b239278c-5a21-11e8-9ea3-a7280df3fd2d.PNG)


## Building Front End Code
the server side code and the MongoDB query ready, Now I start building the front end code. I am creating a great responsive dashboard. I focus on building the charts with creating the layout. For building the charts, I mainly using 3 Javascript libraries __crossfilter.js, d3.js and dc.js__.

* __crossfilter.js__ is a Javascript library for grouping, filtering, and aggregating large datasets.
* __d3.js__ is a Javascript library for controlling the data and building charts.
* __dc.js__ is a Javascript charting library that leverages both crossfilter.js and d3.js, and makes the creation of highly interactive data visualization simple.
I also be using Bootstrap which is a keen.io template dependency, and queue.js which is an asynchronous helper library for Javascript.

![pic3](https://user-images.githubusercontent.com/24476948/39951041-1d1ee06c-557e-11e8-8021-b28d8d0c5a1f.PNG)


I create below files from scratch:
* __app.py__: Server side code for rendering html pages and querying MongoDB
* __graph.js__: Javascript file that will contain the code of our charts
* __custom.css__: css file that will contain our custom css code
Inside index.html, I define all the Javascript and css dependencies, and I have to reference the charts from graph.js.


## Building the charts
All the code for building the charts inside the graph.js file. I start by using a __queue()__ function from the __queue.js__ library. The lines that start with __.defer__ are for reading the products json file. Inside the __.await__ function we call a function named makeGraphs that we define later. This allows us to read Products json data, and wait for all the data to be read before executing the makeGraphs function. The makeGraphs function contains the code for cleaning the data, building the __crossfilter__ dimensions for filtering the data, and the dc.js charts. It takes 2 arguments, the first one is error which can be used for handling any error from the the .defer functions, and as second arguments productsJson which contain the data that we read from the __.defer__ functions.

![pic8](https://user-images.githubusercontent.com/24476948/39972785-f66cf40e-570d-11e8-9517-22ad623ec9f7.PNG)

Next, I create a Crossfilter instance.

![pic9](https://user-images.githubusercontent.com/24476948/39972771-9a2fe7fa-570d-11e8-8a8d-b07db61d8161.PNG)


Next, I define data dimensions.

![pic10](https://user-images.githubusercontent.com/24476948/39972834-acbf9ea0-570e-11e8-8f64-3b451d6adb5c.PNG)


Next, I define data groups.

![pic11](https://user-images.githubusercontent.com/24476948/39972875-226ffcda-570f-11e8-9430-9d3ad42f3ec6.PNG)


Create code for select the product brand and category.

![pic13](https://user-images.githubusercontent.com/24476948/39973093-2c00ee4a-5713-11e8-8c5f-156007f2b92a.PNG)

To show the chart

![pic12](https://user-images.githubusercontent.com/24476948/39973121-937069d4-5713-11e8-8dac-726e15a27b8e.PNG)

Then I define dc charts. I start to code for bar charts and pie charts.

![pic14](https://user-images.githubusercontent.com/24476948/39973140-f10d0f20-5713-11e8-9fed-cbbdf37fe1a3.PNG)

![pic15](https://user-images.githubusercontent.com/24476948/39973193-ee3167d2-5714-11e8-96cd-d049caebc1e2.PNG)

For each chart, I pass the necessary parameters. And finally, I call the renderAll() function for rendering all the charts.

![pic16](https://user-images.githubusercontent.com/24476948/39973214-30170486-5715-11e8-8dc9-dd3376fbe3dd.PNG)

## SalesDashBoard Charts
When running the project on the local server below salesdashboard is show:
![pic17](https://user-images.githubusercontent.com/24476948/39973244-8c28e686-5715-11e8-8632-7206c5f03b17.PNG)

![pic20](https://user-images.githubusercontent.com/24476948/39973585-7696663c-5719-11e8-8dd3-038973e0acc3.PNG)


## Technology Stack
* ### [Flask](http://flask.pocoo.org/)
Flask is a web framework which allows you to create a website to display pages, save data, and many other things. More accurately, it is a micro-framework, because it is a small program which glues together other modules, as opposed to something like Django, which takes a more batteries-included approach.
* ### [MongoDB](https://www.mongodb.com/)
MongoDB is a document database. A record in MongoDB is treated as a document, which is a data structure made up of field and value pairs. MongoDB documents are similar to JSON objects. The values of fields may include other documents, arrays, and arrays of documents.
* ### [Crossfilter.js](http://square.github.io/crossfilter/)
Crossfilter.js is a JavaScript plugin used to slice and dice JavaScript arrays. This allows Dc.js to easily manipulate the datatable that the graphs use, so they can refresh with the filtered data.
* ### [D3.js](https://d3js.org/)
D3.js allows you to make really cool graphs, it isn’t a graphing library. D3.js will build and manipulate coordinate systems, axes, and shapes; but it doesn’t know what a bar chart or a pie chart is. This is where Dc.js comes in. Dc.js defines line graphs, bar and pie charts, and uses D3.js’s objects to build them. This makes it much easier to focus on what you want to display, instead of generating the display itself.
* ### [DC.js](https://dc-js.github.io/dc.js/)
Dc.js is a JavaScript library used to make interactive dashboards in JavaScript. By clicking and selecting different events in graphs, you can filter the entire dashboard to drill into a particular event.
* ### [Queue.js](https://github.com/d3/d3-queue)
A queue evaluates zero or more deferred asynchronous tasks with configurable concurrency: you control how many tasks run at the same time. When all the tasks complete, or an error occurs, the queue passes the results to your await callback.
* ### [Keen.js](https://keen.io/)
This JavaScript library is employed for the template of the dashboard.
* ### [Bootstrap](https://www.http://getbootstrap.com/)
* ### [Python](https://www.python.org/)
Python is a general-purpose interpreted, interactive, object-oriented, and high-level programming language.
* ### [Javascript](https://www.javascript.com/)
* ### [HTML](https://www.w3schools.com/html/)
* ### [CSS](https://www.w3schools.com/css/default.asp)
## Instructions
Open your terminal and use the git clone command:

```git clone https://github.com/hureferdous/SalesDashBoard.git```

Once the project is cloned, enter in SalesDashBoard directory:

```cd SalesDashBoard```

It's recommended to use a virtual environment (to keep isolated the dependencies required by this project). If you don't have it installed, you can do it using ```pip pip install virtualenv```.

Here you have the instructions: [Virtual Environment - The Hitchhiker's Guide to Python] (http://docs.python-guide.org/en/latest/dev/virtualenvs/)

Create a virtual environment for this project and activate it.

Install the dependencies:

```
pip install -r requirements.txt
```

In this project, I've used data that originally I created in __MongoDB__ and then save thoes data in a CSV file called __salesdashboard.csv__. I upload __salesdashboard.csv__ in to GitHub. The file can be downloaded from here.

The file is uploaded to an instance of MongoDb running locally. In doing so, the content is be converted to JSON format.

To do that, open your terminal and run mongoDB by running the command: ``` mongod ```

Leave it running as it is and open another terminal window. Then copy the CSV file to the same location as the directory opened in the second terminal window. Import all data in __MongoDB__ to run this project properly.

It will take a few seconds to run the file.

If you open Mongo Management Studio you can see the uploaded data (now, in JSON format).

Now you can open up your browser and in the URL bar enter http://127.0.0.1:5000
