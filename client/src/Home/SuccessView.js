import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/session";
import { recipeDetails } from "../config";
import CallAPIView from "./CallAPIView";

export default function SuccessView(props) {
    let userId = props.userId;

    const navigate = useNavigate();

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }

    function openLink(url) {
        window.open(url, "_blank");
    }

    const links = [
        {
            name: "Blogs",
            onClick: () => openLink("https://supertokens.com/blog"),
        },
        {
            name: "Documentation",
            onClick: () => openLink(recipeDetails.docsLink),
        },
        {
            name: "Sign Out",
            onClick: logoutClicked,
        },
    ];

    return (
        <>
            <div className="main-container">
                <div className="top-band success-title bold-500">
                    <img alt="Login successful" className="success-icon" /> Login successful
                </div>
                <div className="inner-content">
                    <div>Your userID is:</div>
                    <div className="truncate" id="user-id">
                        {userId}
                    </div>
                    <CallAPIView />
                </div>
            </div>
            <div className="bottom-links-container">
                {links.map((link) => (
                    <div className="link" key={link.name}>
                        <img className="link-icon" alt={link.name} />
                        <div role={"button"} onClick={link.onClick}>
                            {link.name}
                        </div>
                    </div>
                ))}
            </div>
            <img className="separator-line" alt="separator" />
        </>
    );
}
