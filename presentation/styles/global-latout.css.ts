import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get('window');

export const globalStylesLayout = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FBF9F7'
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    paddingBottom: 60,
  },
  position: {
    marginTop: 2000
  },
  icon: {
    position: 'absolute',
    width: 180,
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 2,
    elevation: 14,
    shadowColor: 'rgba(0,0,0,0.10)',
    shadowOffset: { width: 12, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 75,
  },
  iconImage: {
    width: '100%',
    height: '100%',
  },
  iconOverlay: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
  },
  icon1: {
    top: 80,
    left: 10,
  },
  icon2: {
    top: 150,
    left: width / 2 - 105,
  },
  icon3: {
    top: 120,
    right: 10,
  },
  textBlock: {
    zIndex: 1,
  },
  title: {
    fontFamily: 'WinkyRough-Light',
    fontSize: 52,
    lineHeight: 56,
    fontWeight: '400',
    color: '#13213C',
  },
  highlight: {
    fontFamily: 'WinkyRough-Medium',
    fontSize: 20,
    lineHeight: 38,
    fontWeight: '900',
    color: '#0E0F552',
    marginTop: 4,
  },
  description: {
    fontFamily: 'WinkyRough-Light',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
  button: {
    marginTop: 24,
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#ffff',
  },
  color: {
    color: '#FF6B6B',
    fontWeight: 900
  },

  /** Tabs superior */
  tabsBottom: {
    fontFamily: 'WinkyRough-Bold',
    color: '#222831'
  },
  iconosSearch: {
    fontWeight: '900'
  },
  LogBoxShad: {
    backgroundColor: '#fff',
    borderRadius: 16,

    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 43.5, // Aproximación de 87px blur / 2

    // Sombra para Android
    elevation: 10, // Aproximado según intensidad deseada

    paddingBottom: 10
  }
});
