import { StyleSheet, Dimensions } from "react-native";
import { background, greyishBlackColorShaded, primaryColor, secondaryColor, textColor } from "../../utils/Colors";
import { RalewayRegular } from "../../utils/fonts";
import { windowHeight } from "../../utils/WindowDimensions";
const WINDOWHEIGHT = Dimensions.get("screen").height
export const styles = StyleSheet.create({
    container: {
        backgroundColor: background,
        height: "100%",
        // flex: 1
        // paddingBottom: 30
    },
    topContainer: {
        backgroundColor: "#fff",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: (WINDOWHEIGHT > 700) ? WINDOWHEIGHT / 6 : WINDOWHEIGHT / 8
    },
    bottomContainer: {
        // height: "100%",
        backgroundColor: background,
        // height: WINDOWHEIGHT * .6,
        // alignItems: "center"
    },
    messageContainer: {
        paddingBottom: WINDOWHEIGHT * 0.045,
        paddingHorizontal: 20,
    },
    inputContainer: {
        gap: WINDOWHEIGHT * 0.032
    },
    forgotButtonContainer: {
        paddingVertical: WINDOWHEIGHT * 0.020,
    },
    formContainer: {
        // flex: 1,
        width: "90%",
        paddingTop: WINDOWHEIGHT / 30,
        // paddingHorizontal: 20,
        // marginTop: 30,
        alignSelf: "center",
    },
    scrollView: {
        // paddingBottom: 20,
        // backgroundColor: "red"
    },
    marginTop: {
        marginTop: WINDOWHEIGHT / 100
    },
    logo: {
        fontWeight: 'bold',
        color: primaryColor,
        // marginBottom: 20,
    },
    heading: {
        color: textColor,
        fontFamily: RalewayRegular,
        fontSize: 28,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 1,
        paddingBottom: WINDOWHEIGHT * .015
    },
    forecolor: {
        color: '#313131',
        fontFamily: RalewayRegular,
        fontSize: 12,
        marginBottom: 5,
        fontSize: 12
    },
    forgot: {
        // maxWidth: 
        color: greyishBlackColorShaded,
        fontFamily: RalewayRegular,
        fontSize: 10,
        lineHeight: 22,
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