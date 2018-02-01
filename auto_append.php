<?php
$output = ob_get_contents();
ob_end_clean();

#$output = str_replace('http://localhost:4001/', 'https://lab.npeu.ox.ac.uk/mockup/', $output);
$output = str_replace('href="/',    'href="/mockup/', $output);
$output = str_replace('src="/',     'src="/mockup/', $output);
$output = str_replace('data="/',    'data="/mockup/', $output);
$output = str_replace('name="msapplication-config" content="/', 'name="msapplication-config" content="/mockup/', $output);

echo $output;
?>