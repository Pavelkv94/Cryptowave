import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRegistrationConfirmationMutation, useRegistrationEmailResendingMutation } from "../../store/api/authApi";
import "./Confirmation.scss";
import { Button, Input } from "@chakra-ui/react";

const Confirmation = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const confirmCode = queryParams.get("confirm_code"); // Get the confirm_code parameter

    const [register, { error: registrationError, isSuccess: registrationSuccess }] = useRegistrationConfirmationMutation();
    const [resend, { error: resendError, isSuccess: resendSuccess }] = useRegistrationEmailResendingMutation();

    const errorMessage = registrationError?.data.errorsMessages[0].message;
    const resendErrorMessage = resendError?.data.errorsMessages[0].message;

    const isExpired = errorMessage === "Your activation link is expired. Resend activation email.";

    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        register({ code: confirmCode });
    }, []);

    const sendEmail = () => {
        resend({ email });
    };
    return (
        <div className="confirmation">
            <p>
                {registrationError && (errorMessage as string)}
                {registrationSuccess && "Your email has been successfully verified."}
                {isExpired && (
                    <div className="resend">
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                        <Button onClick={sendEmail}>Send</Button>
                    </div>
                )}
            </p>
            {resendErrorMessage && <span>{resendErrorMessage}</span>}
            {resendSuccess && <span style={{ color: "green" }}>A confirmation email has been sent to your email. Please check it.</span>}
        </div>
    );
};

export default Confirmation;
