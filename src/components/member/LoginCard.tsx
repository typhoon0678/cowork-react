import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { ReactNode } from "react";

function LoginCard({ header, body }: {
    header: ReactNode,
    body: ReactNode
}) {

    return (
        <Card
            shadow={false}
            className="w-full py-8 m-auto border border-gray-300 md:px-24 md:py-14"
        >
            <CardHeader shadow={false} floated={false} className="text-center">
                {header}
            </CardHeader>
            <CardBody>
                {body}
            </CardBody>
        </Card>
    );
}

export default LoginCard;