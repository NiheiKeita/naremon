import { Meta, StoryObj } from '@storybook/react';
// import { waitFor, within } from '@storybook/testing-library';
import { AddArticle } from '.';

const meta: Meta<typeof AddArticle> = {
    title: 'views/AddArticle',
    component: AddArticle,
    tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof meta>

export const Test: Story = {
    play: async ({ canvasElement }) => {
        // const canvas = within(canvasElement)
        // await waitFor(async () => {
        //   canvas.getByText("QuestionListView")
        // })
    },
}
