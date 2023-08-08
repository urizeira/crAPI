# 0002_user_jwt_token.py

# Licensed under the Apache License, Version 2.0 (the “License”);
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an “AS IS” BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),  # Ensure this migration runs after the initial one
    ]

    operations = [
                migrations.RunSQL(
                    "ALTER TABLE user_login ALTER COLUMN jwt_token TYPE VARCHAR(1500);
"
                ),

    ]
