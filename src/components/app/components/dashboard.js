import { Grid } from "@mui/material"
import PreviewCard from "./preview_card"
import { useNavigate  } from "react-router-dom"

import { useDocContext } from "../../../contexts/DocumentContext"

export default function Dashboard(props) {

    const { Documents, activateNewDoc } = useDocContext();

    const onSelect = (e) => {
        console.log(e)
        activateNewDoc(e);
        props?.onRedirect("show")
    }

    const getPrevCard = (item) => {
        return <PreviewCard item={item} onSelect={onSelect}/>
    }

    return (
        <>
        <Grid container spacing={2}>
            {Documents.map((items, index) => (
                <Grid item xs={4} key={items.getCntId()}>
                    {getPrevCard(items)}
                </Grid>
            ))}
        </Grid>
        </>
    )
}