import { useRef, useState } from "react";
import type { BoardData } from "./DragDrop";
import './style.css'

function Main({ data }: { data: BoardData }) {
const [dataContainers, setDataContainers] = useState(data)
const dragItem = useRef<any>(null);
const dragContainer = useRef<any>(null);
const containers = Object.keys(dataContainers) as Array<keyof BoardData>;

const handleDragStart = (e: any, container: any, item: any) => {
  dragItem.current = item;
  dragContainer.current = container;
  e.currentTarget.style.opacity = '0.5'
}

const handleDragOver = (e: any) => {
  e.preventDefault();
}

const handleDragEnd = (e: any) => {
  e.currentTarget.style.opacity = '1'
}
  
  const handleDrop = (targetContainer: any) => {    
    const sourceContainer = dragContainer.current;
    setDataContainers((prev:any) => {
        const newData = {...prev}
        newData[sourceContainer] = newData[sourceContainer].filter((item:any)=> item !== dragItem.current)
        console.log("newData[sourceContainer]", newData[sourceContainer], "sourceContainer", sourceContainer)
        newData[targetContainer] = [...newData[targetContainer], dragItem.current];
        console.log("newData[targetContainer]", newData[targetContainer], "targetContainer", targetContainer)
        return newData;
    })

  }

  return (
    <div className="p-4 containers">
      {containers.map((container, index) => (
          <div key={index} 
             className="container" 
             onDragOver={handleDragOver} 
             onDrop={()=>handleDrop(container)}>
             <h2>{container}</h2>
             {dataContainers[container].map((item, itemIndex) => (
               <div 
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e,container,item)}
                  onDragEnd={(e) => handleDragEnd(e)}
                  className="item" 
                  key={itemIndex}>
                 {item}
               </div>
             ))}
          </div>
      ))}
    </div>
  );
}

  export default Main;