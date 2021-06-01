import style from "./Contact.module.css";
import Button from "@material-ui/core/Button";
import emailjs from "emailjs-com";

const Contact = () => {
  const submitEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_l20c7ef",
        "template_sstfkon",
        e.target,
        "user_KGrOiSnNBmYsrU6Gt2ORI"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  };

  return (
    <section className={style.contact} id="contact">
      <main className={style.main}>
        <h2 className={style.headerText}>Contact</h2>
        <h4 className={style.subText}>
          Want to reach me out? Just ring my bell
        </h4>
        <form className={style.form} onSubmit={(e) => submitEmail(e)}>
          <div className={style.formInputs}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="text" name="subject" placeholder="Subject" required />
            <textarea
              name="message"
              rows="4"
              placeholder="Your message here..."
              required
              className={style.textArea}
            ></textarea>
          </div>
          <Button variant="outlined" className="btn" size="large" type="submit">
            Submit
          </Button>
        </form>
      </main>
    </section>
  );
};

export default Contact;
