# Landing Page Project
its page contain 4 sections
every <section> ==> has insid it container to organize other elements
other elements inside container <div> ==> every container containe 1 header <h2> and 2 paragraph <p> inside it
when you move to any <section> it will take class active that will make the active class is unique

## tools of controll
is navList <nav> element
that contain <a> as first element and its just appear in small windows to open and close navigation bar
our <ul> is container of <li> that contains also other <a> element
element <a> inside li is button to move form <section> to other
every <a> has the name of the <section> it will direct to


## Table of Contents

|----<body>
        |
        |---<header.page__header>
        |                   |-----<nav.navbar__menu>
        |                               |-----<a.navIcon>
        |                               |-----<ul#navbar__list>
        |                                               |-----<li>-----<a>
        |
        |---<main>
        |       |-----<header.main__hero>
        |       |                   |------------<h1>
        |       |-----<section#id> x4
        |                       |-------<div.container>
        |                                         |------<h2>
        |                                         |------<p>
        |                                         |------<p>
        |      
        |---<footer>

* [Instructions](#instructions)

## Instructions
1- open index.html
2- to move to any section you want just click on its name in navigation bar
3- if U use any small device you will not see list of nav bar so follow this steps
    a- on the top of page you will see this sign |||
    b- please click on sign
    c- it will open nav list and sign will convert to X 
    d- click on section name that u want to move to it
    e- if u want to close nav list please click on X


The starter project has some HTML and CSS styling to display a static version of the Landing Page project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the Udacity Classroom.
