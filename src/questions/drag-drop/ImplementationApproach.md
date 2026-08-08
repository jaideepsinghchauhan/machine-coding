First we create a initialDataarray which will have keys and arrays with tasks

Second we will dynamically traverse the array by first getting keys and then map it to get individual value

now we can use display flex and create 3 separate containers based on the task

use background and border to identify properly with justifycontent space between

after all this ,we need to set ondrag and drop property from one container to another container 

Then we need to think in dragging and dropping terms, 
draggable="true"  to enable drag
onDragStart={handleDragStart}  to reduce opacity when an item is dragged
onDragEnd={handleDragEnd}   to reset the opacity to 1 

now when we talk about drop we need to remember 2 properties that go in the drop in container and not in the individual item

             onDragOver={handleDragOver} 
             onDrop={(e)=>handleDrop(e, container)}>


then remember to use useRef.current and check the logic to update setdata and traverse only setdata not normal data , it wont update

Video reference: https://www.youtube.com/watch?v=Eovhoys1xU4