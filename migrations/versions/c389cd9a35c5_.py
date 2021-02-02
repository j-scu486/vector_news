"""empty message

Revision ID: c389cd9a35c5
Revises: b5bdd05be297
Create Date: 2021-02-01 17:10:08.858513

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c389cd9a35c5'
down_revision = 'b5bdd05be297'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('post', sa.Column('post_url', sa.String(length=290), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('post', 'post_url')
    # ### end Alembic commands ###
