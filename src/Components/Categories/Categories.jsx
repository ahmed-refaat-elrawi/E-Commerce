import React from "react";
import { Box, Container } from "@mui/material";

function Categories() {
    return (
        <Box
            bgcolor="primary.main"
            maxWidth={800}
            sx={{
                p: { xs: 3, sm: 4, md: 5, lg: 6, xl: 7 },
                margin: 3,
            }}
        >
            <Box
                component="button"
                display="flex"
                justifyContent="center"
                sx={{
                    p: 2,
                    border: "1px dashed grey",
                    backgroundColor: "secondary.main",
                    color: "white",
                    my: 5,
                }}
            >
                Categories
            </Box>
        </Box>
    );
}

export default Categories;
