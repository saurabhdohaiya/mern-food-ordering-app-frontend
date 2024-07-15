import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useRef} from "react";
import {useCreateMyUser} from "@/api/MyUserApi.tsx";
import {useNavigate} from "react-router-dom";
import LoadingContainer from "@/components/LoadingContainer.tsx";

function AuthCallbackPage() {
    const navigate = useNavigate();
    const {user} = useAuth0();
    const {createUser } = useCreateMyUser();

    const hasCreatedUser = useRef<boolean>(false);

    useEffect(() => {
        console.log("USER:", user);
        if(user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({
                auth0Id: user.sub,
                email: user.email,
            });
            hasCreatedUser.current = true;
        }
        navigate("/");
    }, [createUser, navigate, user]);

    return (
        <LoadingContainer/>
    );
}

export default AuthCallbackPage;