import { Typography, Input } from "@material-tailwind/react";

function LoginTextField({ name, korName, placeholder, value, setValue }: { name: string, korName: string, placeholder: string, value: string, setValue: (value: string) => void }) {

    let type = "password";
    if (name.startsWith("email")) {
        type = "email";
    }

    return (
        <div>
            <label htmlFor={name}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="block mb-2 font-medium"
                >
                    {korName}
                </Typography>
            </label>
            <Input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                id={name}
                color="gray"
                size="lg"
                type={type}
                name={name}
                placeholder={placeholder}
                className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
                labelProps={{
                    className: "hidden",
                }}
                crossOrigin=""
            />
        </div>
    );
}

export default LoginTextField;