### Initiate Password Reset :
- The doctor initiates a password reset by providing their email.
- The server checks if a doctor with the provided email exists.
- If the doctor exists, generate a unique password reset token and store it in the database associated with the doctor.
- Send an email to the doctor's email address containing a link with the generated token.

### Receive Password Reset Email:
- The doctor receives the password reset email with the link containing the reset token.

### Click the Reset Link
- The doctor clicks the link in the email, which directs them to a password reset page on application (not build yet).

### Enter New Password:
- The doctor arrives at the password reset page and enters a new password.

### Submit New Password:
- The doctor submits the new password along with the reset token. req.body = {newPassword, token}

### Validate Token:
-The server receives the request to reset the password, along with the reset token and the new password.
- The server checks if the token is valid and has not expired.
- If the token is valid, proceed with the password reset; otherwise, return an error.

### Reset Password:
- Hash the new password.
- Update the doctor's password in the database with the hashed new password.
- Clear the stored password reset token in the database.

