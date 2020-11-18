import Constants from "expo-constants";
import { StyleSheet, Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },

  searchContainer: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 2.5,
    backgroundColor: "#ededed",
  },
  searchInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,

    color: "#111",
    fontFamily: "Roboto_400Regular",
  },
  searchButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  searchUfsContainer: {
    top: 48,
    zIndex: 100,
    position: "absolute",

    width: "100%",
    maxHeight: (windowHeight * 48) / 100,
    paddingHorizontal: 16,
    marginBottom: 40,

    backgroundColor: "#ededed",
    borderBottomLeftRadius: 2.5,
    borderBottomRightRadius: 2.5,
  },
  searchUfsItem: {
    height: 40,
    zIndex: 1000,
    marginVertical: 4,

    flexDirection: "row",
    alignItems: "center",
  },
  searchUfsItemText: {
    color: "#808080",
    fontFamily: "Roboto_500Medium",
  },

  content: {
    flex: 1,
    marginTop: 40,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  title: {
    marginBottom: 8,
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#111",
  },

  back: {
    flexDirection: "row",
    alignItems: "center",
  },

  backTest: {
    color: "#111",
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
    marginLeft: 8,
  },

  regionSeparator: {
    height: 1,
    marginVertical: 32,
    backgroundColor: "#ededed",
  },

  itemShimmer: {
    width: "100%",
    height: 160,
    backgroundColor: "#ededed",
  },

  infoContainer: {
    height: 48,
    paddingTop: 16,
    alignItems: "center",
    flexDirection: "row",
    borderTopColor: "#ededed",
    borderTopWidth: 1,
  },

  infoText: {
    marginLeft: 16,
    fontFamily: "Poppins_700Bold",
    color: "#808080",
  },
});

export default styles;
