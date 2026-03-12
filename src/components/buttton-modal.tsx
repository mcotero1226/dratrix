
import { Button } from "antd"
const ButtonModal = ({type,onClick,title}:any) => {
    return <Button type={type} onClick={onClick}>
        {title}
    </Button>
}
export { ButtonModal }