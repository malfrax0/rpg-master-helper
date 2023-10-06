import { LinearProgress, Typography } from "@mui/material";


export default function PageLoader() {
    const RandomLoadingText = [
        "Ceci est la page de chargement de l'application"
    ];

    return (
        <div className="block absolute top-0 left-0 w-screen h-screen">
            <div className="flex items-center justify-center absolute top-0 left-0 right-0 bottom-0">
                <Typography>
                    {RandomLoadingText[Math.floor(Math.random() * RandomLoadingText.length)]}
                </Typography>
            </div>
            <div className="absolute bottom-16 h-2 left-8 right-8">
                <LinearProgress />
            </div>
        </div>
    )
}