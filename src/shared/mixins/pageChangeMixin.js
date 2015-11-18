
/**
 * Add this mixin to every component which can be routed to
 */
export default {
  statics: {
     willTransitionTo: function (transition) {

      // send analytics
      if (typeof window !== 'undefined' && 'ga' in window) {
        window.ga('send', 'pageview', {'page': transition.path});
      }
    }
  }
}
