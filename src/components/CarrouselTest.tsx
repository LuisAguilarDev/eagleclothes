import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, } from '@mui/material'
import {data} from '../data/data' 

function Example(props:any)
{
   
    return (
        
        <Carousel indicators={false} >
            {
                data?.results?.map( (item, i,array) => 
                {
                    if(array[i+2]){
                        return (<div>
                            <Item key={i} item={item} />
                            <Item key={i+1} item={array[i+1]} />
                            <Item key={i+2} item={array[i+2]} />
                           </div>)
                    }
    
                } 
            ).splice(0,data?.results.length-3)
            }
        </Carousel>
    )
}

function Item(props:any)
{
console.log(props.item.images[0],'fhsihf')
console.log( props.item.name,'fhsihf')
    return (
       
        props.item?.images && props?.item?(
        <>
        {/* <Paper > */}
            <h2>{props.item.name}</h2>
            <img alt="45" src={props.item.images[0].url}/>

            <Button className="CheckButton">
                Check it out!
            </Button>
        {/* </Paper> */}
        </>
        ):<div></div>
       
    )
}
export{Example,Item}