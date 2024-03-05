import { useSessionContext } from "supertokens-auth-react/recipe/session";

export default function Album() {
    const sessionContext = useSessionContext();

    if (sessionContext.loading === true) {
        return null;
    }

    return (
        <div className="fill" id="Album-container">
        </div>
    );
}
