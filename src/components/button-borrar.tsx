
import { Button } from "antd"
const MyButton = (props: any) => {

    return <Button className="mt-52" color={props.text} onClick={props.onClick} icon={props.icon}>{props.significado}</Button>

    
}
export { MyButton }