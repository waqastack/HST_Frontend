import { addtocart, removeItem ,lengthTell} from "../Constants";
// note every case will make only the changes the main global state....that's it
const ProductReducer = (state = [0], action) => {
  switch (action.type) {
    case addtocart:
     const data = [
        ...state,
        {
          id: action.id,
          title: action.title,
          price: action.price,
          image: action.selectedFile,
        },
      ];
     
      //check if the action id exists in the addedItems
      const uniqueObjectArr = []
      const uniqueObjectSet = new Set()
      //set method returns us unique values for an array / or array of an object 
     for(const any of data){
      const jsonObject =  JSON.stringify(any);
      if(!uniqueObjectSet.has(jsonObject)){
        uniqueObjectArr.push(any)
      }
      uniqueObjectSet.add(jsonObject);
     }
     return [...uniqueObjectArr]
      // check exists data
  
    case removeItem:
    return state.filter(val=>val.id!==action.id); 
 case lengthTell:
   if(action.length===undefined){
     return 0;
   }
   return action.length;
    default:
      return state;
  }
};
export default ProductReducer;
