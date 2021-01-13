import React from "react";
import {Accordion} from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import ReactPlayer from "react-player";

const ReferenceView: React.FC = () => {

  return (
    <section className="m-5">
      <h1 className="text-center mb-5">Reference</h1>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <h2><i className="fas fa-certificate"/> Newton Fractals</h2>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p className="reference-paragraph-text">
                The Newton fractal is a boundary set in the complex plane which is characterized by Newton's method
                applied to a fixed polynomial or transcendental function. It is the Julia set of the meromorphic
                function
              </p>
              <p className="reference-paragraph-text">
                which is given by Newton's method. When there are no attractive cycles (of order greater than 1),
                it divides the complex plane into regions, each of which is associated with
                a root. In this way the Newton fractal is similar to the Mandelbrot set, and like other fractals it
                exhibits an intricate appearance arising from a simple description. It is relevant to numerical analysis
                because it shows that (outside the region of quadratic convergence) the Newton method can be very
                sensitive to its choice of start point.
                Many points of the complex plane are associated with one of the for Newton's iteration,
                yielding a sequence of points, If the sequence converges to the root, then was an element of the
                region. However, for every polynomial of degree at least 2 there are points for which the Newton
                iteration does not converge to any root: examples are the boundaries of the basins of attraction of the
                various roots. There are even polynomials for which open sets of starting points fail to converge to any
                root: a simple example is, where some points are attracted by the cycle 0, 1, 0, 1 ... rather than by a
                root.
              </p>
              <p className="reference-paragraph-text">
                An open set for which the iterations converge towards a given root or cycle (that is not a fixed point),
                is a Fatou set for the iteration. The complementary set to the union of all these, is the Julia set.
                The Fatou sets have common boundary, namely the Julia set. Therefore, each point of the Julia set is
                a point of accumulation for each of the Fatou sets. It is this property that causes the fractal
                structure of the Julia set (when the degree of the polynomial is larger than 2).
              </p>

              <a target="_blank" href="http://paulbourke.net/fractals/newtonraphson/" className="my-link">
                <button type="button" className="btn btn-outline-primary my-button">Read more</button>
              </a>

              <p className="m-3">
                <ReactPlayer className="center"
                             url='https://www.youtube.com/watch?v=7RZn3B709wo&ab_channel=MichaelHartley'
                             playing={false}
                             height="500px"/>
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            <h2><i className="fas fa-palette"/> Color Schemes</h2>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <p className="reference-paragraph-text">
                The RGB color model is an additive color model in which red, green, and blue light are added together
                in various ways to reproduce a broad array of colors. The name of the model comes from the initials of
                the three additive primary colors, red, green, and blue.
              </p>
              <p className="reference-paragraph-text">
                The main purpose of the RGB color model is for the sensing, representation, and display of images in
                electronic systems, such as televisions and computers, though it has also been used in conventional
                photography. Before the electronic age, the RGB color model already had a solid theory behind it,
                based in human perception of colors.
              </p>
              <p className="reference-paragraph-text">
                RGB is a device-dependent color model: different devices detect or reproduce a given RGB value
                differently, since the color elements (such as phosphors or dyes) and their response to the individual
                R, G, and B levels vary from manufacturer to manufacturer, or even in the same device over time.
                Thus an RGB value does not define the same color across devices without some kind of color management.
              </p>
              <p className="reference-paragraph-text">
                HSL (hue, saturation, lightness) and HSV (hue, saturation, value, also known as HSB or hue, saturation,
                brightness) are alternative representations of the RGB color model, designed in the 1970s by computer
                graphics researchers to more closely align with the way human vision perceives color-making attributes.
                In these models, colors of each hue are arranged in a radial slice, around a central axis of neutral
                colors which ranges from black at the bottom to white at the top.
              </p>
              <p className="reference-paragraph-text">
                The HSV representation models the way paints of different colors mix together, with the saturation
                dimension resembling various tints of brightly colored paint, and the value dimension resembling the
                mixture of those paints with varying amounts of black or white paint. The HSL model attempts to resemble
                more perceptual color models such as the Natural Color System (NCS) or Munsell color system, placing
                fully saturated colors around a circle at a lightness value of ½, where a lightness value of 0 or 1 is
                fully black or white, respectively.
              </p>

              <p className="m-3">
                <ReactPlayer className="center"
                             url='https://youtu.be/Ceur-ARJ4Wc'
                             playing={false}
                             height="500px"/>
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            <h2><i className="fab fa-artstation"/> Affine Transformation</h2>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <p className="reference-paragraph-text">
                In Euclidean geometry, an affine transformation, or an affinity (from the Latin, affinis, "connected
                with"), is a geometric transformation that preserves lines and parallelism (but not necessarily
                distances
                and angles).
              </p>

              <p className="reference-paragraph-text">
                More generally, an affine transformation is an automorphism of an affine space (Euclidean spaces are
                specific affine spaces), that is, a function which maps an affine space onto itself while preserving
                both the dimension of any affine subspaces (meaning that it sends points to points, lines to lines,
                planes to planes, and so on) and the ratios of the lengths of parallel line segments. Consequently,
                sets of parallel affine subspaces remain parallel after an affine transformation. An affine
                transformation
                does not necessarily preserve angles between lines or distances between points, though it does preserve
                ratios of distances between points lying on a straight line.
              </p>
              <p className="reference-paragraph-text">
                If X is the point set of an affine space, then every affine transformation on X can be represented as
                the composition of a linear transformation on X and a translation of X. Unlike a purely linear
                transformation, an affine transformation need not preserve the origin of the affine space. Thus, every
                linear transformation is affine, but not every affine transformation is linear.
              </p>
              <p className="reference-paragraph-text">
                Examples of affine transformations include translation, scaling, homothety, similarity, reflection,
                rotation, shear mapping, and compositions of them in any combination and sequence.
              </p>
              <p className="reference-paragraph-text">
                Viewing an affine space as the complement of a hyperplane at infinity of a projective space, the affine
                transformations are the projective transformations of that projective space that leave the hyperplane
                at infinity invariant, restricted to the complement of that hyperplane.
              </p>

              <p className="m-3">
                <ReactPlayer className="center"
                             url='https://www.youtube.com/watch?v=il6Z5LCykZk&ab_channel=Udacity'
                             playing={false}
                             height="500px"/>
              </p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </section>
  );
}

export default ReferenceView;