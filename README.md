# dhsc-gascd-prototype
Repository for the Prototyping Toolkit for DHSC GASCD Delivery

Bobby King and Ian Cuddy worked on this prototype between November 2024 and April 2025. 
Most of the components come from the govuk prototype kit. 
We used D3.js to create some of the graphs and Leaflet JS to create interactive maps.
For example, see the page /0-5/landing-pages/care-home-capacity/care-homes
We also used nunjucks and SVG to create some charts. 
As the pages often require a lot of code we used the nunjucks 'include' feature eg {% include "./foo.html "%} a lot, in order to separate the graphs and tables into separate files. See the folder /0-5/landing-pages/care-home-capacity/
We ran user research on the versions up until version 4. Version 5 is based on feedback from care providers and academic researchers but the project was put on hold before we got a chance to test it on more users. 
The earlier versions of the designs contain more of a narrative; as time went on we found that users reacted with more enthusiasm to interactive maps and personalised data. Version 5 uses more of a 'show don't tell approach'. 
If you're reading this, we hope you get the chance to test this prototype out on more users. 
Bobby King, April 2025