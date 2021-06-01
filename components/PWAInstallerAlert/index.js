import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PWAInstallerAlert = () => {
  const [showInstallPrompt, setshowInstallPrompt] = useState(false);

  const closeInstallPrompt = () => {
    setshowInstallPrompt(false);
  };

  const installHandler = async () => {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install prompt.
    setshowInstallPrompt(false);
  };

  const showBeforeInstall = (event) => {
    console.log("👍", "beforeinstallprompt", event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Show the install button
    setshowInstallPrompt(true);
  };

  const appInstalled = () => {
    // Hide the install button
    closeInstallPrompt();
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log("PWA was installed");
  };

  useEffect(() => {
    // Access window from client
    window.addEventListener("beforeinstallprompt", (event) =>
      showBeforeInstall(event)
    );

    window.addEventListener("appinstalled", appInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", (event) =>
        showBeforeInstall(event)
      );
      window.removeEventListener("appinstalled", appInstalled);
    };
  }, []);

  return (
    <div>
      <Dialog
        open={showInstallPrompt}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeInstallPrompt}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"This page is a Progressive Web App (PWA)"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You can install it on your device just like a regular native
            application
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeInstallPrompt} color="primary">
            Later
          </Button>
          <Button onClick={installHandler} color="primary">
            Install
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PWAInstallerAlert;
