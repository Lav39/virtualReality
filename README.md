# React Test App
Single Page Application using React, Redux and Aframe

**To Run:**

Unzip source code and run the following commands under appropriate directories
 - Do 'npm install'
 - Run 'npm start'
 
Client starts at 8000

**Code Structure and Characteristics:**

 - React components are divided into 'components' and 'containers'
 - Components are dumb and are functional components
 - They do not know about the state or redux store, their role is to take care of the UI
 - Containers know about the states and are connected to redux stores
 - Local states has been maintained for unshared state variables
 - They just render the corresponding UI component
 - All the actions are dispatched via 'containers'
 - Reducers are responsible for updating the states in store
 - Reducers are pure functions

Note-
1. All ".obj" and ".mtl" files are present in "assests" folder. 
   I downloaded all these files because i was facing CORS issue while fetching.
   Later i was able to fetch these files by creating a node server and due to lack of time i was not able to integrate it to solution.
2. Some of image file used in ".mtl" files were not provided and hence some models do not show proper texture.
3. Some of models do not load at all. I assume there is problem with given ".mtl" or ".obj" files.
4. Application performs little poor on hosted site as i am using heroku free dyno to host it.
5. Application works fine when ran locally.
5. I have no prior experience working with Aframe.
6. Application link - https://vrapplication.herokuapp.com/
