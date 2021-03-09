import axios from 'axios'
import fs from 'fs'

const SITE_ID = "MLA"
const SELLER_ID ="179571326"

const listItemsFromSeller = async (SITE_ID, SELLER_ID) =>{

    try {
       //Makes api call and extracts data
        const {data}= await axios.get(`https://api.mercadolibre.com/sites/${SITE_ID}/search?seller_id=${SELLER_ID}`)
       //map the results array and make a copy with only the data we need
        const result = data.results.map((result, index)=>{
            return{
                "id":result.id,
                "title":result.title, 
                "category_id": result.category_id,
                "category_name": result.domain_id
            }
            })
        //Transform the json to a human readable string
       const file = JSON.stringify(result,null, 2)
        //Writes the string to a .log file
       fs.writeFile(`items_from_seller_${SELLER_ID}.log`, file, (err) => {
        if (err) {
            throw err;
        }
        console.log(`Items from seller ${SELLER_ID} saved sucesfully`);
    });
    } catch (error) {
        console.log(error)
    }
  
  
  
    }

listItemsFromSeller(SITE_ID, SELLER_ID)
 
    
 
