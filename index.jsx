import { useState } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { Card, Button, Form } from '@openedx/paragon';

const LTIURLsWidget = ({ blockId, unitTitle, courseId, xBlocks }) => {
  const [component, setComponent] = useState(blockId);
  const baseUrl = getConfig().LMS_BASE_URL;

  const copyToClipboard = () => {
    const url = `${baseUrl}/lti_provider/courses/${courseId}/${component}`;
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(url);
    } else {
      alert('Copying to clipboard works only on HTTPS pages.');
    }
  };

  return (
    <Card style={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <Card.Header title="LTI Provider URL" />
      <Card.Section>
        <Form.Control
          as="select"
          value={component}
          onChange={(e) => setComponent(e.target.value)}
        >
          <option value={blockId}>Unit: {unitTitle}</option>
          {xBlocks.map(block => (
            <option value={block.id} key={block.id}>
              Component: {block.name}
            </option>
          ))}
        </Form.Control>

        <pre style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          fontSize: 'small',
          margin: '1rem 0',
          backgroundColor: '#eee',
          padding: '0.5rem',
          borderRadius: '0.25rem',
        }}
        >
          {baseUrl}/lti_provider/courses/{courseId}/{component}
        </pre>
      </Card.Section>
      <Card.Footer>
        <Button onClick={copyToClipboard}>
          Copy URL to Clipboard
        </Button>
      </Card.Footer>
    </Card>
  );
};

LTIURLsWidget.propTypes = {
  blockId: PropTypes.string.isRequired,
  unitTitle: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
  xBlocks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default LTIURLsWidget;
