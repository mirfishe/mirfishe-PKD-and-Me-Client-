import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import {Alert, Rating} from '@material-ui/lab/';
import {Grid, Button, Checkbox, InputLabel, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

import {baseURL} from "../../Helpers/constants"
import {IUserReview} from "../../Helpers/interfaces"

interface IProps {
    userID: number | null,
    isLoggedIn: boolean | null,
    isAdmin: boolean | null,
    sessionToken: string,
    titleID: number | null,
    reviewID: number | null,
    userReviewUpdated: () => void
};

interface IState {
    message: string,
    errMessage: string,
    dialogOpen: boolean,
    userReviewRecordAdded: boolean | null,
    userReviewResultsFound: boolean | null,
    userReviewRecordUpdated: boolean | null,
    cbxRead: boolean,
    txtDateRead: string,
    rdoRating: number | null,
    txtShortReview: string,
    txtLongReview: string,
    userReviewData?: IUserReview | null,
    // reviewID: number | null,
    // userID: number | null,
    updatedBy: number | null,
    // titleID: number | null,
    read: boolean | null,
    dateRead: Date | null,
    rating: number | null,
    shortReview: string,
    longReview: string,
    active: boolean | null
};

class UpdateUserReview extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            message: "",
            errMessage: "",
            dialogOpen: false,
            userReviewRecordAdded: null,
            userReviewResultsFound: null,
            userReviewRecordUpdated: null,
            cbxRead: false,
            txtDateRead: "",
            rdoRating: null,
            txtShortReview: "",
            txtLongReview: "",
            userReviewData: null,
            // reviewID: null,
            // userID: null,
            updatedBy: null,
            // titleID: null,
            read: null,
            dateRead: null,
            rating: null,
            shortReview: "",
            longReview: "",
            active: null
        };

    };

    getUserReview = () => {
        // console.log("UpdateUserReview.tsx getUserReview");
        // console.log("UpdateUserReview.tsx getUserReview baseURL", baseURL);

        // console.log("UpdateUserReview.tsx getUserReview this.props.reviewID", this.props.reviewID);

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({userReviewData: null});
        // this.setState({reviewID: null});
        // this.setState({userID: null});
        this.setState({updatedBy: null});
        // this.setState({titleID: null});
        this.setState({read: null});
        this.setState({dateRead: null});
        this.setState({rating: null});
        this.setState({shortReview: ""});
        this.setState({longReview: ""});
        this.setState({active: null});

        let url: string = baseURL + "userreview";

        if (this.props.reviewID !== null) {
            url = url + "/" + this.props.reviewID;

            // console.log("UpdateUserReview.tsx getUserReview url", url);

            fetch(url, {
                method: "GET",
                headers: new Headers({
                "Content-Type": "application/json"
                }),
            })
            .then(response => {
                // console.log("UpdateUserReview.tsx getUserReview response", response);
                if (!response.ok) {
                    throw Error(response.status + " " + response.statusText + " " + response.url);
                } else {
                    return response.json();
                };
            })
            .then(data => {
                // console.log("UpdateUserReview.tsx getUserReview data", data);

                this.setState({userReviewResultsFound: data.resultsFound});
                // this.setState({message: data.message});

                if (data.resultsFound) {
                    this.setState({userReviewData: data.userReviews[0]});
                    // console.log("UpdateUserReview.tsx getUserReview userReviewData", this.state.userReviewData);

                    this.setState({cbxRead: data.userReviews[0].read});

                    if (data.dateRead !== undefined) {
                        this.setState({txtDateRead: data.dateRead.toString().substring(0, 10)});
                    } else {
                        this.setState({txtDateRead: ""});
                    };

                    this.setState({rdoRating: data.userReviews[0].rating});
                    this.setState({txtShortReview: data.userReviews[0].shortReview});
                    this.setState({txtLongReview: data.userReviews[0].longReview});
    
                    // this.setState({reviewID: data.userReviews[0].reviewID});
                    // this.setState({userID: data.userReviews[0].userID});
                    this.setState({updatedBy: data.userReviews[0].updatedBy});
                    // this.setState({titleID: data.userReviews[0].titleID});
                    this.setState({read: data.userReviews[0].read});
                    this.setState({dateRead: data.userReviews[0].dateRead});
                    this.setState({rating: data.userReviews[0].rating});
                    this.setState({shortReview: data.userReviews[0].shortReview});
                    this.setState({longReview: data.userReviews[0].longReview});
                    this.setState({active: data.userReviews[0].active});
                } else {
                    this.setState({errMessage: data.message});
                };

            })
            .catch(error => {
                console.log("UpdateUserReview.tsx getUserReview error", error);
                // console.log("UpdateUserReview.tsx getUserReview error.name", error.name);
                // console.log("UpdateUserReview.tsx getUserReview error.message", error.message);
                this.setState({errMessage: error.name + ": " + error.message});
            });
        };
    };

    updateUserReview = (deleteUserReview: boolean) => {
        // console.log("UpdateUserReview.tsx updateUserReview");
        // this.setState({message: "form submitted"});

        this.setState({message: ""});
        this.setState({errMessage: ""});
        this.setState({userReviewData: null});
        // this.setState({reviewID: null});
        // this.setState({userID: null});
        this.setState({updatedBy: null});
        // this.setState({titleID: null});
        this.setState({read: null});
        this.setState({dateRead: null});
        this.setState({rating: null});
        this.setState({shortReview: ""});
        this.setState({longReview: ""});
        this.setState({active: null});

        // Check to make sure that this.state.txtDateRead) is a date?
        // Check to make sure that this.props.titleID is a number?
        // txtDateRead is expecting a date and rdoRating is expecting a number
        // if (this.state.txtDateRead !== null && this.state.rdoRating !== null) {

            let userReviewObject = {
                titleID: this.props.titleID,
                read: this.state.cbxRead,
                // dateRead: this.state.txtDateRead,
                rating: this.state.rdoRating,
                shortReview: this.state.txtShortReview.trim(),
                longReview: this.state.txtLongReview.trim(),
                // active:     this.state.active
                active:     !deleteUserReview
            };

            // If the user doesn't enter a date read, then it isn't added/updated
            if (this.state.txtDateRead.trim().length !== 0) {
                Object.assign(userReviewObject, {dateRead: this.state.txtDateRead.trim()});
            };

            // console.log("UpdateUserReview.tsx updateUserReview userReviewObject", userReviewObject);

            let url: string = baseURL + "userreview/";

            if (this.props.reviewID !== null) {
                url = url + "/" + this.props.reviewID;
            };

            // console.log("UpdateUserReview.tsx updateUserReview url", url);

            fetch(url, {
                method: "PUT",
                headers:    new Headers ({
                    "Content-Type": "application/json",
                    "Authorization": this.props.sessionToken
                }),
                body: JSON.stringify({userReview: userReviewObject})
            })
            .then(response => {
                // console.log("UpdateUserReview.tsx updateUserReview response", response);
                // if (!response.ok) {
                //     throw Error(response.status + " " + response.statusText + " " + response.url);
                // } else {
                    // if (response.status === 200) {
                        return response.json();
                    // } else {
                    //     return response.status;
                    // };
                // };
            })
            .then(data => {
                // console.log("UpdateUserReview.tsx updateUserReview data", data);

                this.setState({userReviewRecordUpdated: data.recordUpdated});
                // this.setState({isLoggedIn: data.isLoggedIn});
                // this.setState({isAdmin: data.isAdmin});
                this.setState({message: data.message});

                if (data.recordUpdated) {
                    this.setState({cbxRead: data.read});

                    if (data.dateRead !== undefined) {
                        this.setState({txtDateRead: data.dateRead.toString().substring(0, 10)});
                    } else {
                        this.setState({txtDateRead: ""});
                    };

                    this.setState({rdoRating: data.rating});
                    this.setState({txtShortReview: data.shortReview});
                    this.setState({txtLongReview: data.longReview});

                    // this.setState({reviewID: data.reviewID});
                    // this.setState({userID: data.userID});
                    this.setState({updatedBy: data.updatedBy});
                    // this.setState({titleID: data.titleID});
                    this.setState({read: data.read});
                    this.setState({dateRead: data.dateRead});
                    this.setState({rating: data.rating});
                    this.setState({shortReview: data.shortReview});
                    this.setState({longReview: data.longReview});
                    this.setState({active: data.active});

                    this.props.userReviewUpdated();

                } else {
                    // console.log("UpdateUser.tsx data.errorMessages", data.errorMessages);
                    // this.setState({errMessage: data.error});
                    this.setState({errMessage: data.errorMessages});
                };

            })
            .catch(error => {
                console.log("UpdateUserReview.tsx updateUserReview error", error);
                // console.log("UpdateUserReview.tsx updateUserReview error.name", error.name);
                // console.log("UpdateUserReview.tsx updateUserReview error.message", error.message);
                this.setState({errMessage: error.name + ": " + error.message});
            });

        // };

    };

    componentDidMount() {
        // this.getUserReview();
      };

    handleOpen = () => {
        this.setState({dialogOpen: true});
        this.getUserReview();
    };
    
    handleClose = () => {
        this.setState({dialogOpen: false});
    };

    render() {

        if (!this.props.isLoggedIn) {
            return <Redirect to="/" />;
        };

        // console.log("UpdateUser.tsx this.state.errMessage", this.state.errMessage);

        return(
            <div>
            <Button variant="contained" color="primary" onClick={this.handleOpen}>Update Review</Button>
            <Dialog open={this.state.dialogOpen} onClose={this.handleClose} fullWidth={true} maxWidth="md">
                <DialogTitle id="form-dialog-title">Update Review</DialogTitle>
                <DialogContent>
                <Grid item xs={12}>
                {this.state.message !== "" ? <Alert severity="info">{this.state.message}</Alert> : null}
                {this.state.errMessage !== "" ? <Alert severity="error">{this.state.errMessage}</Alert> : null}
                </Grid>
                <Grid item xs={12}>

                <InputLabel htmlFor="cbxRead">Read</InputLabel>
                <Checkbox id="cbxRead" value={this.state.cbxRead} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({cbxRead: !this.state.cbxRead});}} />

                </Grid>
                <Grid item xs={12}>

                <InputLabel htmlFor="txtDateRead">Date Read</InputLabel>
                <TextField type="date" id="txtDateRead" variant="outlined" fullWidth
          margin="normal" value={this.state.txtDateRead} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtDateRead: event.target.value});}} />

                </Grid>
                <Grid item xs={12}>

                <Typography component="legend">Rating</Typography>
                <Rating name="rdoRating" defaultValue={0} max={10} value={this.state.rdoRating} onChange={(event, newValue) => {/*console.log(event.target.value);*/ this.setState({rdoRating: newValue});}} />

                </Grid>
                <Grid item xs={12}>

                <InputLabel htmlFor="txtShortReview">Short Review</InputLabel>
                <TextField type="text" id="txtShortReview" label="Short Review" variant="outlined" fullWidth
          margin="normal" value={this.state.txtShortReview} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtShortReview: event.target.value});}} />

                </Grid>
                <Grid item xs={12}>

                <InputLabel htmlFor="txtLongReview">Long Review</InputLabel>
                <TextField type="text" id="txtLongReview" label="Long Review" variant="outlined" fullWidth
          margin="normal" value={this.state.txtLongReview} onChange={(event) => {/*console.log(event.target.value);*/ this.setState({txtLongReview: event.target.value});}} />
                </Grid>

                <DialogActions>
                    <Button variant="outlined" color="primary" onClick={(event) => {/*console.log(event.target.value);*/ this.updateUserReview(false);}}>Update Review</Button>
                    <Button variant="outlined" color="secondary" onClick={(event) => {/*console.log(event.target.value);*/ this.updateUserReview(true);}}>Delete Review</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}>Cancel</Button>
                </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
        );
    };
};

export default UpdateUserReview;