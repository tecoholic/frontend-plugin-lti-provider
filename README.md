# frontend-plugins-lti-provider

LTI Provider widget for displaying and copying LTI provider URLs in Open edX.

## Installation

```bash
npm install @tecoholic/frontend-plugins-lti-provider
```

## Usage

```jsx
import LTIURLsWidget from '@tecoholic/frontend-plugins-lti-provider';

<LTIURLsWidget
  blockId="block-v1:test+test+test+type@vertical+block@abc123"
  unitTitle="Unit 1"
  courseId="course-v1:test+test+test"
  xBlocks={[
    { id: 'block-id-1', name: 'Component 1' },
    { id: 'block-id-2', name: 'Component 2' },
  ]}
/>
```

## Props

- `blockId` (string, required): The block ID of the unit
- `unitTitle` (string, required): The title of the unit
- `courseId` (string, required): The course ID
- `xBlocks` (array, required): Array of xBlock objects with `id` and `name` properties

## Features

- Display LTI Provider URL for the current unit or selected component
- Copy URL to clipboard with a single click
- Dropdown to select different components within the unit

## Requirements

- React 16.8+
- @edx/frontend-platform ^15.0.0
- @openedx/paragon ^17.0.0

## License

AGPL-3.0
