// export const heatmapLayer = {
//   type: 'heatmap',
//   source: 'connections',
//   paint: {
//     // Increase the heatmap weight based on frequency and property magnitude
//     'heatmap-weight': [
//       "interpolate",
//       ["linear"],
//       ["get", "occ_ratio"],
//       0.1,
//       0,
//       60,
//       1
//     ],
//     // Increase the heatmap color weight weight by zoom level
//     // heatmap-intensity is a multiplier on top of heatmap-weight
//     'heatmap-intensity': 1,
//     // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
//     // Begin color ramp at 0-stop with a 0-transparancy color
//     // to create a blur-like effect.
//     'heatmap-color': [
//       "interpolate",
//       ["linear"],
//       ["heatmap-density"],
//       0,
//       "rgba(0, 0, 255, 0)",
//       0.1,
//       "royalblue",
//       0.3,
//       "cyan",
//       0.5,
//       "lime",
//       0.7,
//       "yellow",
//       1,
//       "red"
//     ],
//     // Adjust the heatmap radius by zoom level
//     'heatmap-radius': [
//       "interpolate",
//       ["linear"],
//       ["get", "Unique Clients"],
//       0,
//       5,
//       80,
//       30
//     ],
//     // Transition from heatmap to circle layer by zoom level
//     'heatmap-opacity': 1
//   }
// };
export const heatmapLayer = {
  type: 'circle',
  source: 'connections',
  paint: {
    'circle-color': "hsl(137, 93%, 32%)",
    // Adjust the heatmap radius by zoom level
    'circle-radius': [
      "interpolate",
      ["linear"],
      ["get", "Unique Clients"],
      0,
      5,
      368,
      60
    ],
  }
};