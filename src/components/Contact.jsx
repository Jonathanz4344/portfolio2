import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import axios from 'axios';
import styles from '~/routes/contact/contact.module.css';

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

export const Contact = () => {
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const initDelay = tokens.base.durationS;
  const [formStatus, setFormStatus] = useState({ success: false, errors: null });
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);

    // Client-side validation
    const errors = {};
    if (!email.value || !EMAIL_PATTERN.test(email.value)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!message.value) {
      errors.message = 'Please enter a message.';
    }

    if (email.value.length > MAX_EMAIL_LENGTH) {
      errors.email = `Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`;
    }

    if (message.value.length > MAX_MESSAGE_LENGTH) {
      errors.message = `Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`;
    }

    if (Object.keys(errors).length > 0) {
      setFormStatus({ success: false, errors });
      setSending(false);
      return;
    }

    try {
      // Create form data
      const formData = new FormData();
      formData.append('email', email.value);
      formData.append('message', message.value);

      // Submit directly to Formspree
      await axios.post('https://formspree.io/f/xpzvdgzd', formData);
      setFormStatus({ success: true, errors: null });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        success: false,
        errors: { message: 'There was a problem sending your message. Please try again.' }
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Section className={styles.contact}>
      <Transition unmount in={!formStatus.success} timeout={1600}>
        {({ status, nodeRef }) => (
          <form
            className={styles.form}
            method="post"
            ref={nodeRef}
            onSubmit={handleSubmit}
          >
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Say hello" start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
            {/* Hidden honeypot field to identify bots */}
            <Input
              className={styles.botkiller}
              label="Name"
              name="name"
              maxLength={MAX_EMAIL_LENGTH}
            />
            <Input
              required
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay)}
              autoComplete="email"
              label="Your email"
              type="email"
              name="email"
              maxLength={MAX_EMAIL_LENGTH}
              {...email}
            />
            <Input
              required
              multiline
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationS, initDelay)}
              autoComplete="off"
              label="Message"
              name="message"
              maxLength={MAX_MESSAGE_LENGTH}
              {...message}
            />
            <Transition
              unmount
              in={!sending && formStatus.errors}
              timeout={msToNum(tokens.base.durationM)}
            >
              {({ status: errorStatus, nodeRef }) => (
                <div
                  className={styles.formError}
                  ref={nodeRef}
                  data-status={errorStatus}
                  style={cssProps({
                    height: errorStatus ? errorRef.current?.offsetHeight : 0,
                  })}
                >
                  <div className={styles.formErrorContent} ref={errorRef}>
                    <div className={styles.formErrorMessage}>
                      <Icon className={styles.formErrorIcon} icon="error" />
                      {formStatus.errors?.email}
                      {formStatus.errors?.message}
                    </div>
                  </div>
                </div>
              )}
            </Transition>
            <Button
              className={styles.button}
              data-status={status}
              data-sending={sending}
              style={getDelay(tokens.base.durationM, initDelay)}
              disabled={sending}
              loading={sending}
              loadingText="Sending..."
              icon="send"
              type="submit"
            >
              Send message
            </Button>
          </form>
        )}
      </Transition>
      <Transition unmount in={formStatus.success}>
        {({ status, nodeRef }) => (
          <div className={styles.complete} aria-live="polite" ref={nodeRef}>
            <Heading
              level={3}
              as="h3"
              className={styles.completeTitle}
              data-status={status}
            >
              Message Sent
            </Heading>
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              I&apos;ll get back to you within a couple days, sit tight
            </Text>
            <Button
              secondary
              iconHoverShift
              className={styles.completeButton}
              data-status={status}
              style={getDelay(tokens.base.durationM)}
              onClick={() => navigate('/')}
              icon="chevron-right"
            >
              Back to homepage
            </Button>
          </div>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}

export default Contact;