import { Button } from "./button"

interface AppbarProps{
    user?: {
        name?: string | null;
    };
    onSignin: () => void;
    onSignOut: () => void;
}

export const Appbar = ({
    user,
    onSignin,
    onSignOut
}: AppbarProps) => {
    return <div>
        <div className="flex align-items-center justify-between border-b px-5 bg-slate-100">
            <div className="flex flex-col align-items-center justify-center">
                Paytm
            </div>
            <div className="flex flex-col align-items-center justify-center">
                <Button onClick={user? onSignOut : onSignin}>{user? "Logout" : "Login"}</Button>
            </div>
        </div>
    </div>
}