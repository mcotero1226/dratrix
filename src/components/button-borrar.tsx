
import { Button } from "antd"
const MyButton =(props:any)=>{
    return <Button className="mt-52"  type={props.text} onClick={props.onClick}>{props.significado}</Button>
}
export {MyButton}