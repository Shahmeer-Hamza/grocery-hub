import { background, primaryColor, secondaryColor } from "../../utils/Colors";
import { PoppinsBlack, RalewayRegular } from "../../utils/fonts";

const { StyleSheet, Dimensions } = require("react-native");
const { width, height } = Dimensions.get('screen')

export const styles = StyleSheet.create({
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  container: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    backgroundColor: background,
    // paddingBottom: 100,
  },
  scrollView: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
  },
  pageHeader: {
    color: '#222235',
    fontFamily: RalewayRegular,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 32,
    letterSpacing: 1.455,
    textTransform: 'uppercase',
  },
  listing_card: {
    backgroundColor: '#FFFFFF',
    // paddingHorizontal: 20,
  },
  card: {
    elevation: 5,
  },
  listing_card_body: {
    width: '100%',
    height: '100%',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,

    // elevation: 3,
    borderRadius: 15,
  },
  card_img_view: {
    // width: '100%',
    // minHeight: 184,
    // maxHeight: 200,
    // backgroundColor: 'red',
    width: 100,
    height: 80,
    // backgroundColor: "aqua",
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card_img: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "flex-end",
  },
  addCartButton: {
    width: 22,
    height: 22,
    backgroundColor: primaryColor,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card_details: {
    width: '100%',
    backgroundColor: 'white',
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
    // padding: 10,
  },
  details_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    justifyContent: "flex-end"
    // height: 50,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: '700',
    flex: 1, marginLeft: 10, marginBottom: 10, fontFamily: PoppinsBlack
    // textAlign:"right"
  },
  price: {
    color: '#000',
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 10
  },
  details_bottom: {
    flexDirection: 'row',
    width: "70%",
    alignItems: 'center',
    // justifyContent: "center",
    paddingVertical: 10,
    // height: 50,
  },
  address: {
    color: 'gray',
    marginHorizontal: 10,
    fontSize: 12,
    // paddingRight: 15,
  },
  cart_btn: {
    backgroundColor: secondaryColor,
    padding: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#ffffff',
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: 15,
  },
  cart_btn_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 5,
  },
});