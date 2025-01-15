import { Button, Tooltip } from "@material-tailwind/react";
import { MdHelp } from "react-icons/md";

function FeaturePlan({ feature, p }: { feature: string, p: string }) {
    return (
        <Tooltip content={feature}
            placement={p}>
            <Button className="px-3 bg-red-900 ">
                <MdHelp size={16} />
            </Button>
        </Tooltip>
    );
}

export default FeaturePlan;