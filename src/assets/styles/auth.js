import { StyleSheet, Dimensions } from "react-native";
import { primaryColor, secondaryColor } from "../../utils/Colors";
const WINDOWHEIGHT = Dimensions.get("screen").height
export const styles = StyleSheet.create({
    container: {
        backgroundColor: secondaryColor,
        height: "100%",
        paddingBottom: 30

    },
    topContainer: {
        backgroundColor: "#fff",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: (WINDOWHEIGHT>700) ? WINDOWHEIGHT/6:WINDOWHEIGHT/8
    },
    bottomContainer: {
        // marginTop: 40,
        height: "90%",
        backgroundColor: secondaryColor,
        // alignItems: "center"
    },
    formContainer: {
        // flex: 1,
        width: "90%",
        paddingTop: WINDOWHEIGHT/15,
        paddingHorizontal: 20,
        marginTop: 30,
        alignSelf: "center",
    },
    scrollView: {
        paddingBottom: 20
    },
    marginTop: {
        marginTop: WINDOWHEIGHT/100
    },
    logo: {
        fontWeight: 'bold',
        color: primaryColor,

        // marginBottom: 20,
    },
    heading: {
        fontWeight: '600',
        fontFamily: "PublicSans",
        fontSize: 18,
        letterSpacing: 1,
        color: '#fff',
        textAlign: 'center',
    },
    forecolor: {
        marginBottom: 5,
        color: '#fff',
        fontFamily: "PublicSans",

        fontSize: 12
    },
    forgot: {
        color: 'white',
        fontSize: 10,
        alignSelf: "flex-end",
        fontFamily: "PublicSans",
    },
    loginText: {
        color: 'white',
        fontSize: 14,
        fontFamily: "PublicSans",
    },
    viewSignup: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    successMessage: {
        backgroundColor: '#D4EDDA',
        color: '#6E9D79',
        borderRadius: 3,
        borderWidth: 3,
        borderColor: '#C3E6CB',
    },
    errorMessage: {
        marginVertical: 10,
        backgroundColor: '#fff',
        color: secondaryColor,
        borderRadius: 3,
        borderWidth: 3,
        borderColor: secondaryColor,
        padding: 6,
        paddingTop: 10,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
});